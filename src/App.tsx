import React, { useEffect, useState } from "react";
import axios from "axios";

import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import CustomTable, { TableColumn } from "./components/Tabela";
import { Product } from "./components/Types";

const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((response) => setProducts(response.data))
      .catch((error) => console.error("Erro ao buscar dados da API:", error));
  }, []);

  const openModal = (product: Product) => {
    setSelectedProduct(product);
  };

  const closeModal = () => {
    setSelectedProduct(null);
  };

  const columns: TableColumn<Product>[] = [
    { accessor: "title", head: "Título" },
    { accessor: "price", head: "Preço" },
    { accessor: "category", head: "Categoria" },
    {
      head: "Ver detalhes",
      isActionButton: true,
      onActionClick: (product) => openModal(product),
    },
  ];

  return (
    <div>
      <h1>Lista de Produtos</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {" "}
        <CustomTable data={products} columns={columns} />
      </div>

      <Modal show={!!selectedProduct} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Produto Detalhes</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedProduct && (
            <div>
              <p>Título: {selectedProduct.title}</p>
              <p>Preço: {selectedProduct.price}</p>
              <p>Categoria: {selectedProduct.category}</p>
              <p>Rate: {selectedProduct.rating.rate}</p>
              <p>Count: {selectedProduct.rating.count}</p>
              <img
                src={selectedProduct.image}
                alt={selectedProduct.title}
                style={{ width: 100 }}
              />
              {/* Adicione mais informações conforme necessário */}
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={closeModal}>
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default App;
