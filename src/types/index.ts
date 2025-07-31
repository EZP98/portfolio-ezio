export interface WorkItem {
  id: string;
  title: string;
  category: string;
  image: string;
  link: string;
}

export interface ProductItem {
  id: string;
  name: string;
  type: string;
  price: string;
  image: string;
  icon: string;
  link: string;
}

export interface StackItem {
  id: string;
  name: string;
  description: string;
  logo: string;
  link: string;
}

export interface BlogLink {
  id: string;
  title: string;
  link: string;
  hasArrow?: boolean;
}