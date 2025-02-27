import Loading from "./Loading";

function Splash() {
  return (
    <div className='bg-base-300 bg-opacity-50 fixed h-screen w-screen flex justify-center z-10 '>
      <Loading size='lg' />
    </div>
  );
}

export default Splash;