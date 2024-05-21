import { Input } from "./ui/input";
import { useState } from "react";
import { firestore } from "../firebase";
import { collection, query, orderBy } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";



export default SearchBar;