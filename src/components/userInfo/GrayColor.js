const GrayColor = ({ setHideNewForm, hideNewForm }) => {
    const grayClickHandler = (event) => {
      setHideNewForm(true);
    };
  
    return (
      <div
        className={hideNewForm ? "hidden" : "gray"}
        onClick={grayClickHandler}
      ></div>
    );
  };
  
  export default GrayColor;
  