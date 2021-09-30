const Divider: React.FC<{ text: string }> = ({ text }) => {
  return (
    <div className="flex items-center justify-center">
      <div className="bg-gray-300 h-px flex-1 shadow-sm" />
      <p className="px-2 text-gray-500 dark:text-gray-300 font-medium text-sm">
        {text}
      </p>
      <div className="bg-gray-300 h-px flex-1 shadow-sm" />
    </div>
  );
};
export default Divider;
