import { useLocation } from "react-router-dom";

const ResourceDetails = () => {
  const location = useLocation();
  const { item } = location.state || {};
  console.log(item);

  return (
    <div>
      <div className="w-[50%] mx-auto mt-5">
        <h1 className="text-5xl text-center font-extrabold pt-8">
          {item.resourceTitle}
        </h1>
        <p className="text-center text-lg mt-4">{item.resourceDescription}</p>
      </div>

      <div className="w-[90%] pb-10 mx-auto pt-10">
        <h2 className="text-2xl mb-4 font-bold">Resources</h2>

        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 border-b text-left">Name</th>
                <th className="px-4 py-2 border-b text-left">URL</th>
                <th className="px-4 py-2 border-b text-left">Description</th>
              </tr>
            </thead>
            <tbody>
              {item.resourceLinks.map((resource, index) => (
                <tr key={index} className="hover:bg-black hover:text-white transition-colors">
                  <td className="px-4 py-2 border-b font-medium">
                    {resource.name}
                  </td>
                  <td className="px-4 py-2 border-b break-words">
                    <a className=""
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {resource.url}
                    </a>
                  </td>
                  <td className="px-4 py-2 border-b">{resource.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ResourceDetails;
