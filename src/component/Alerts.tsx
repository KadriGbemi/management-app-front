const Alert = ({ message, setMessage, type }: { message: string; setMessage: Function; type: 'error' | 'success' }) => (
  <div
    className={`fixed top-10 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex 
      items-center p-2 text-sm rounded-lg shadow-lg z-50 ${type === 'error' ? 'bg-danger text-white' : 'bg-tetiary text-secondary'}`}
    role='alert'
  >
    <svg
      className='flex-shrink-0 inline w-4 h-4 me-3'
      aria-hidden='true'
      xmlns='http://www.w3.org/2000/svg'
      fill='currentColor'
      viewBox='0 0 20 20'
    >
      <path d='M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z' />
    </svg>
    <span className='sr-only'>Info</span>
    <div>
      <span className='font-medium'>{type=== "error"? 'An error occured': "New update"}:</span> {message}
    </div>
    <button
      type='button'
      className={`ms-auto bg-transparent rounded-lg text-sm p-1.5 ml-auto inline-flex items-center ${
        type === 'error' ? 'hover:text-red' : 'hover:text-secondary/60'
      }`}
      aria-label='Close'
      onClick={() => setMessage(null)}
    >
      <svg
        className='w-4 h-4'
        xmlns='http://www.w3.org/2000/svg'
        fill='currentColor'
        viewBox='0 0 20 20'
        aria-hidden='true'
      >
        <path d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z' />
      </svg>
    </button>
  </div>
)

export default Alert
