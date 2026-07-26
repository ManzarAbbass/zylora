interface UserAvatarProps {
  name: string;
  image?: string | null;
  className?: string;
}

function getInitials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("");
}

export function UserAvatar({ name, image, className = "" }: UserAvatarProps) {
  if (image) {
    return (
      <img
        src={image}
        alt={name}
        className={`size-9 shrink-0 rounded-full object-cover ${className}`}
      />
    );
  }

  return (
    <div
      className={`flex size-9 shrink-0 items-center justify-center rounded-lg bg-white/15 text-xs font-bold text-white ${className}`}
    >
      {getInitials(name)}
    </div>
  );
}
