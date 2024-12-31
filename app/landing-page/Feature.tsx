const Feature = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => (
  <div className="bg-secondary p-5 border rounded-lg shadow-md">
    <h4 className="mb-2 font-semibold italic text-primary text-lg">{title}</h4>
    <p className="font-mono">{description}</p>
  </div>
);

export default Feature;
