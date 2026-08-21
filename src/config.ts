import caramelMacchiatoImg from './assets/images/caramel_macchiato_1787297942395.jpg';
import spanishLatteImg from './assets/images/spanish_latte_1787297960931.jpg';
import mochaLatteImg from './assets/images/mocha_latte_1787297981457.jpg';
import classicLatteImg from './assets/images/classic_latte_1787297993460.jpg';
import americanoImg from './assets/images/americano_1787298006989.jpg';

export const STORE_CONFIG = {
  // ---------------------------------------------------------
  // ✏️ BEGINNERS: EDIT YOUR STORE DETAILS HERE
  // ---------------------------------------------------------
  STORE_NAME: "JOHN COFFEE'S",
  PRODUCT_NAME: "Timpla Coffee",
  PRODUCT_DESCRIPTION: "Exceptional coffee, warm atmosphere, and good vibes—every single day.",
  CURRENCY: "₱",
  
  // Update variants to match the menu
  MENU: [
    { name: "Caramel Macchiato", type: "⭐ Special", price: 49, image: caramelMacchiatoImg },
    { name: "Spanish Latte", type: "⭐ Special", price: 49, image: spanishLatteImg },
    { name: "Mocha Latte", type: "⭐ Special", price: 49, image: mochaLatteImg },
    { name: "Classic Latte", type: "Regular", price: 30, image: classicLatteImg },
    { name: "Americano", type: "Regular", price: 30, image: americanoImg }
  ],
  
  // Default variant for the form
  DEFAULT_COUNTRY: "Philippines",

  // ---------------------------------------------------------
  // 🗄️ SUPABASE DATABASE CONNECTION
  // ---------------------------------------------------------
  SUPABASE_URL: "https://vujwrgqkkzatzlupqxxz.supabase.co",
  SUPABASE_PUBLISHABLE_KEY: "sb_publishable_7TVgBzB0Y-Re4IWZ48kvFw_4dboMY9g"
};
