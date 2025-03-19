interface PageHeaderProps {
  title: string;
  description?: string;
}

export function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <header className="flex flex-col items-center mb-12">
      <h1 className="text-4xl font-bold mb-4">{title}</h1>
      {description && (
        <p className="text-xl text-gray-600 dark:text-gray-300 text-center">
          {description}
        </p>
      )}
    </header>
  );
} 