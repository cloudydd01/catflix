import ReactModal from 'react-modal';

function VideoModal({ isOpen, onClose, children }) {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={{
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.75)',
        },
        content: {
          position: 'absolute',
          top: '0',
          left: '0',
          right: '0',
          bottom: '0',
          border: 'none',
          background: '#000',
          padding: '0',
        },
      }}
    >
      {children}
    </ReactModal>
  );
}

export default VideoModal;