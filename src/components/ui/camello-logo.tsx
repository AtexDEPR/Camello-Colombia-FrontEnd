interface CamelloLogoProps {
  className?: string;
}

export function CamelloLogo({ className = "h-6 w-6" }: CamelloLogoProps) {
  return (
    <img
      src="/camello.png"
      alt="Camello - Logo"
      className={`${className} object-contain`}
    />
  );
}
