import { v4 } from 'uuid';

const cats = [
  {
    id: v4(),
    name: "Gosho",
    imageUrl: "https://ichef.bbci.co.uk/news/976/cpsprodpb/12A9B/production/_111434467_gettyimages-1143489763.jpg",
    breed: "Bombay Cat",
    description:
      "Test 1 Dominant and aggressive to other cats. Will probably eat you in your sleep. Very cute tho.",
    price: 425
  },
  {
    id: v4(),
    name: "Tosho",
    imageUrl: "https://cdn.pixabay.com/photo/2015/06/19/14/20/cat-814952_1280.jpg",
    breed: "Ragdoll",
    description:
      "Test 2 Dominant and aggressive to other cats. Will probably eat you in your sleep. Very cute tho.",
    price: 500
  },
  {
    id: v4(),
    name: "Boko",
    imageUrl: "https://cdn.pixabay.com/photo/2018/08/08/05/12/cat-3591348_1280.jpg",
    breed: "Siamese Cat",
    description:
      "Test 3 Dominant and aggressive to other cats. Will probably eat you in your sleep. Very cute tho.",
    price: 290
  },
  {
    id: v4(),
    name: "Loko",
    imageUrl: "https://cdn.pixabay.com/photo/2017/02/20/18/03/cat-2083492_1280.jpg",
    breed: "Birman",
    description:
      "Test 4 Dominant and aggressive to other cats. Will probably eat you in your sleep. Very cute tho.",
    price: 350
  },
  {
    id: v4(),
    name: "Toko",
    imageUrl: "https://cdn.pixabay.com/photo/2014/04/13/20/49/cat-323262_1280.jpg",
    breed: "British Shorthair",
    description:
      "Test 5 Dominant and aggressive to other cats. Will probably eat you in your sleep. Very cute tho.",
    price: 320
  }
];

export default cats;