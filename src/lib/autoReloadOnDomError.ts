// Detecta el error "Failed to execute 'removeChild' on 'Node'" y recarga automáticamente
// la página con un rate limit para evitar bucles de recarga.

const RELOAD_COOLDOWN_MS = 30000; // 30s entre recargas automáticas
const RELOAD_FLAG_KEY = "camello:autoReload:last";
const ERROR_TEXT = "Failed to execute 'removeChild' on 'Node'";

function shouldReload(): boolean {
  try {
    const last = Number(sessionStorage.getItem(RELOAD_FLAG_KEY) || 0);
    const now = Date.now();
    return !last || now - last > RELOAD_COOLDOWN_MS;
  } catch {
    return true;
  }
}

function markReload(): void {
  try {
    sessionStorage.setItem(RELOAD_FLAG_KEY, String(Date.now()));
  } catch {
    // noop
  }
}

function matchesRemoveChildNotFound(err: unknown, message?: string): boolean {
  // Coincide si es un DOMException NotFoundError con el texto esperado
  const msg = String(message || (err as any)?.message || "");
  const name = (err as any)?.name;
  return (
    (!!name && String(name) === "NotFoundError" && msg.includes("removeChild")) ||
    msg.includes(ERROR_TEXT)
  );
}

function tryAutoReload(reason: string): void {
  if (!shouldReload()) return;
  markReload();
  // Pequeño retraso para permitir cualquier limpieza pendiente
  setTimeout(() => {
    try {
      AutoReloadAPI.triggerReload();
    } catch {
      // noop
    }
  }, 50);
}

// Evita registrar múltiples veces
declare global {
  interface Window {
    __camelloAutoReloadRegistered?: boolean;
  }
}

export function registerAutoReloadOnDomError(): void {
  if (typeof window === "undefined") return;
  if (window.__camelloAutoReloadRegistered) return;
  window.__camelloAutoReloadRegistered = true;

  // Captura errores globales
  window.addEventListener("error", (event) => {
    if (matchesRemoveChildNotFound((event as ErrorEvent).error, (event as ErrorEvent).message)) {
      tryAutoReload("window.error");
    }
  });

  // Captura rechazos no manejados (por si el error aparece en una promesa)
  window.addEventListener("unhandledrejection", (event) => {
    const reason = (event as PromiseRejectionEvent).reason;
    if (matchesRemoveChildNotFound(reason, (reason && reason.message) as string | undefined)) {
      tryAutoReload("unhandledrejection");
    }
  });

  // Parchea console.error para detectar el patrón en mensajes que no lanzan eventos
  const originalConsoleError = console.error;
  console.error = (...args: any[]) => {
    try {
      const hasPattern = args.some((a) => {
        if (typeof a === "string") return a.includes(ERROR_TEXT) || a.includes("removeChild");
        return matchesRemoveChildNotFound(a);
      });
      if (hasPattern) {
        tryAutoReload("console.error");
      }
    } catch {
      // noop
    } finally {
      originalConsoleError.apply(console, args);
    }
  };
}

// API exportado para facilitar pruebas
export const AutoReloadAPI = {
  triggerReload: () => window.location.reload(),
};

// Auto-registro al importar el módulo
registerAutoReloadOnDomError();