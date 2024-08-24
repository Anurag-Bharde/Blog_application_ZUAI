import { formatDistance } from "date-fns";

export default function BlogModal({ post, onClose, onPrev, onNext }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">{post.Title}</h2>
          <button onClick={onClose} className="text-2xl">&times;</button>
        </div>
        <p className="text-gray-500 mb-2">
          {formatDistance(new Date(), new Date(post.TimePost))} ago
        </p>
        <p className="mb-4">{post.Post}</p>
        <div className="border-t pt-4">
          <p className="font-semibold">{post.user.firstName} {post.user.lastName}</p>
          <p className="text-gray-600">{post.user.profession}</p>
        </div>
        <div className="flex justify-between mt-4">
          <button onClick={onPrev} className="px-4 py-2 bg-gray-200 rounded">&larr; Previous</button>
          <button onClick={onNext} className="px-4 py-2 bg-gray-200 rounded">Next &rarr;</button>
        </div>
      </div>
    </div>
  );
}