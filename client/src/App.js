import React from 'react'
import { AppRouter } from './router/AppRouter'
import "./style/normalize.css";
import "./style/animation.css";
import "./style/landing-page.css";
import "./style/nav.css"
import "./style/scroll.css"
import "./style/card.css"
import "./style/pagination.css"
import "./style/footer.css"
import "./style/card-detalis.css"
import "./style/create-dog.css"
import "./style/alert-error.css";
export const App = () => {

  return (
    <AppRouter />
  )
}