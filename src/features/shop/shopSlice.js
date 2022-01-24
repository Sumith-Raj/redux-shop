import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState={
    products:[],
    cart:[]
}
export const shopSlice = createSlice({
    name:'shop',
    initialState,
    reducers:{
        sell:(state, action)=>{
            const {title, price} = action.payload
            state.products.push({id:nanoid(), title, price})
        },
        buy:(state,action)=>{ 
            state.cart.push(state.products.find(item => item.id === action.payload))
        },
        remove:(state,action)=>{  
            state.cart=state.cart.filter(item => item.id !== action.payload)
        },
        checkout:(state,action)=>{  
            state.cart=[]
        }
    }
})
export const selectProducts = (state) => state.shop.products
export const selectCart = (state) => state.shop.cart
export const getTotal = state => selectCart(state).reduce((a,v)=> a =a+v.price,0)

export const {sell, buy, remove, checkout} = shopSlice.actions
export default shopSlice.reducer