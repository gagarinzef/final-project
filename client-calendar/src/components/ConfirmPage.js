import { useParams } from "react-router-dom";

function ConfirmPage() {
  const params = useParams();

  return (
    <div className="ConfirmPage">
      <div className="flex justify-center mt-20">
        <a className="block p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-1000">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
            TODO APP
          </h5>
          <p className="font-normal text-gray-700">
            {params.msg}, please check your email.
          </p>
        </a>
      </div>
    </div>
  );
}

export default ConfirmPage;
