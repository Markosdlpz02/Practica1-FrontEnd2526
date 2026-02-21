import "./styles.css"

export const ErrorMessage = (params:{message:string}) => {
  return <div className="ErrorMessage">
      <h3>Error</h3>
      <p>{params.message}</p>
  </div>;
};