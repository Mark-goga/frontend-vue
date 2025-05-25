export function getUserInitials(name: string): string {
  const [firstName, lastName] = name.split(' ') || ['невідомий', 'користувач'];
  const firstInitial = firstName ? firstName.charAt(0).toUpperCase() : '';
  const lastInitial = lastName ? lastName.charAt(0).toUpperCase() : '';
  return firstInitial + (lastInitial || '');
}

export function getUserColor(): string {
  const colors = [
    '#8b5cf6',
    '#6366f1',
    '#ec4899',
    '#f43f5e',
    '#0ea5e9',
    '#10b981',
    '#84cc16',
    '#f59e0b',
    '#d946ef',
    '#2dd4bf',
  ];

  const randomColor = Math.floor(Math.random() * colors.length);

  return colors[randomColor];
}
