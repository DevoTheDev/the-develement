type BaseProduct = {
    name: string;
    price: number;
}

type Laptop = {
    type: "laptop";
    gpu: string;
    cpu: string;
}

type Phone = {
    type: "phone"
    camera: string
}

type Product = BaseProduct & (Laptop | Phone);

const newbie: Product = {
    name: "BLEEP",
    price: 1000,
    type: "laptop",
    cpu: "Bleeper",
    gpu: "Bleepo"
}

