interface TrailerModalProps {
  videoKey: string;
  onClose: () => void;
}

export default function TrailerModal({ videoKey, onClose }: TrailerModalProps) {
  return (
    // Backdrop
    <div
      className='fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm'
      onClick={onClose}
    >
      {/* Modal box */}
      <div
        className='relative w-full max-w-3xl mx-4 aspect-video'
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className='absolute -top-10 right-0 text-white/70 hover:text-white text-sm'
        >
          X Close
        </button>

        {/* YouTube embed */}
        <iframe
          src={`https://www.youtube.com/embed/${videoKey}?autoplay=1`}
          className='w-full h-full rounded-xl'
          allow='autoplay; encrypted-media'
          allowFullScreen
        />
      </div>
    </div>
  );
}
