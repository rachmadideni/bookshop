import swaggerAutogen from "swagger-autogen";

const doc = {
  info: {
    version: "v1.0.0",
    title: "Bookshop API",
  },
  servers: [
    {
      url: "http://localhost:3001/api",
      description: "",
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
      },
    },
    schemas: {
      orderSchema: {
        $customerId: "c0bbf765-0157-4575-a2db-dc60e179688b",
        $books: ["02495b21-5ffd-42b2-abab-772742e20ac3"],
      },
      getOrdersSchema: {
        $customerId: "c0bbf765-0157-4575-a2db-dc60e179688b",
      },
      paymentSchema: {
        $amount: 1000,
        $orderIds: [
          "c0bbf765-0157-4575-a2db-dc60e179688b",
          "c0bbf765-0157-4575-a2db-dc60e179688b",
        ],
      },
      cancelOrderSchema: {
        $orderIds: ["c0bbf765-0157-4575-a2db-dc60e179688b"],
      },
    },
  },
};

const outputFile = "./swagger_output.json";
const endpointsFiles = [
  "./src/controllers/auth.ts",
  "./src/controllers/customer.ts",
  "./src/controllers/book.ts",
  "./src/controllers/order.ts",
];

swaggerAutogen({ openapi: "3.0.0" })(outputFile, endpointsFiles, doc);
