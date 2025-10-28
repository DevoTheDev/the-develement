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



// ssh -i "develement-ssh.pem" ubuntu@ec2-18-118-34-25.us-east-2.compute.amazonaws.com

/* 
rsync -avz --exclude 'node_modules' --exclude '.git' --exclude '.env' \
-e "ssh -i ~/.ssh/develement-ssh.pem" \
. ubuntu@ec2-18-118-34-25.us-east-2.compute.amazonaws.com:~/app


*/