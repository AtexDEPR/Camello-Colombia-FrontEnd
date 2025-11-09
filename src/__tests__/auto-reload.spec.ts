import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
// Importa el módulo para registrar los manejadores y su API
import * as AutoReloadMod from '@/lib/autoReloadOnDomError'

describe('Auto reload on NotFoundError removeChild', () => {
  let reloadSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    vi.useFakeTimers();
    // Limpia cooldown entre pruebas
    sessionStorage.removeItem('camello:autoReload:last');
    reloadSpy = vi.spyOn(AutoReloadMod.AutoReloadAPI, 'triggerReload').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
    reloadSpy.mockRestore();
  });

  it('recarga al detectar NotFoundError con mensaje removeChild', () => {
    const err = new DOMException(
      "Failed to execute 'removeChild' on 'Node': The node to be removed is not a child of this node.",
      'NotFoundError'
    );

    window.dispatchEvent(new ErrorEvent('error', { error: err, message: err.message }));

    // Avanza timers para ejecutar el reload programado
    vi.runAllTimers();
    expect(reloadSpy).toHaveBeenCalledTimes(1);
  });

  it('aplica rate limit: no recarga dos veces seguidas', () => {
    const err = new DOMException(
      "Failed to execute 'removeChild' on 'Node': The node to be removed is not a child of this node.",
      'NotFoundError'
    );

    window.dispatchEvent(new ErrorEvent('error', { error: err, message: err.message }));
    vi.runAllTimers();
    expect(reloadSpy).toHaveBeenCalledTimes(1);

    // Segundo evento dentro del cooldown
    window.dispatchEvent(new ErrorEvent('error', { error: err, message: err.message }));
    vi.runAllTimers();
    expect(reloadSpy).toHaveBeenCalledTimes(1);
  });

  it('detecta también el patrón vía console.error', () => {
    // Emite un console.error con el texto característico
    console.error("NotFoundError: Failed to execute 'removeChild' on 'Node'");
    vi.runAllTimers();
    expect(reloadSpy).toHaveBeenCalledTimes(1);
  });
});