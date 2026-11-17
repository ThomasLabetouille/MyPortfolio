import { Component } from "react";

// Si une page plante (ou si un morceau du site ne se charge plus après un redéploiement),
// on affiche un message à la place d'un écran blanc ; la barre de navigation reste en place.
export default class ErrorBoundary extends Component {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error) {
    console.error(error);
  }

  render() {
    if (!this.state.failed) return this.props.children;
    const { message, reload } = this.props;
    return (
      <main id="contenu" className="detail">
        <div className="wrap">
          <p className="lead">{message}</p>
          <button type="button" className="btn" onClick={() => window.location.reload()}>{reload}</button>
        </div>
      </main>
    );
  }
}
