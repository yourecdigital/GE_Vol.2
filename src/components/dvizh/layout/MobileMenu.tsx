import Link from "next/link";

interface MobileMenuProps {
  links: { href: string; label: string }[];
  pathname: string;
  open: boolean;
  onClose: () => void;
}

export function MobileMenu({ links, pathname, open, onClose }: MobileMenuProps) {
  return (
    <div className={`mobile-menu${open ? " open" : ""}`} role="dialog" aria-modal={open}>
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={`mobile-menu-link${pathname === link.href ? " active" : ""}`}
          onClick={onClose}
        >
          {link.label}
        </Link>
      ))}
    </div>
  );
}
