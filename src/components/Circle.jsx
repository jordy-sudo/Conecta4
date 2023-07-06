const Circle = ({ color, handleClick }) => {
    return (
      <div
        className={`flex items-center justify-center rounded-full ${color}`}
        onClick={handleClick}
      ></div>
    );
  };
  
  export default Circle;