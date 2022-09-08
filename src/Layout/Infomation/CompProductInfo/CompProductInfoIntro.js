const style = {
    maxWidth: "50%"
}

const stylePara = {
    fontSize : "17px",
}

function CompProductInfoIntro(props) {
  return (
    <div style = {style}>      
      <p style={stylePara}>{props.des}</p>
      <br/>
    </div>
  );
}

export default CompProductInfoIntro;
