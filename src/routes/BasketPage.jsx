import { useOutletContext } from "react-router-dom";

function BasketPage() {
  const hey = useOutletContext();
  console.log(hey)
  return (
    <h1>This is the basket page</h1>
  )
}

export default BasketPage;