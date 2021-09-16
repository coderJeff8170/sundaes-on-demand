import Container from "react-bootstrap/Container";
import { OrderDetailsProvider } from "./contexts/OrderDetails";
import OrderEntry from "./pages/entry/OrderEntry";

function App() {
  return (
    <Container>
      <OrderDetailsProvider>
        {/* summary and entry page need the state from the provider */}
        <OrderEntry />
      </OrderDetailsProvider>
      {/* confirmation page does not need to know about the state from the provider */}
    </Container>
  );
}

export default App;
