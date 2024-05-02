import React, { useState } from 'react';
import { 
  IonApp, 
  IonContent, 
  IonHeader, 
  IonTitle,
  IonRow, 
  IonToolbar, 
  IonCard,
  IonCardContent,
  IonInput,
  IonButton,
  IonToast,
  setupIonicReact 
} from '@ionic/react';

/* CSS de base requis pour le fonctionnement des composants Ionic */
import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Utilitaires CSS optionnels */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Variables de thème */
import './theme/variables.css';

// Configuration Ionic React
setupIonicReact();

const App: React.FC = () => {
  const [montant, setMontant] = useState<number | null>(null);
  const [montantTotal, setMontantTotal] = useState<number | null>(null);
  const [erreur, setErreur] = useState<string>('');

  // Fonction pour calculer les taxes
  const calculerTaxes = () => {
    if (montant !== null) {
      if (montant > 0) {
        // Effectuez les calculs de taxes ici
        const montantInitial = montant;
        const tvq = Number.parseFloat((montant * 0.09975).toFixed(2));
        const tps = montant * 0.05; // Taux de TPS (5%)
        const totalTaxes = tvq + tps;
        const total = montant + totalTaxes;
  
        setMontantTotal(total);
        setErreur('');
  
        console.log('Montant initial:', montantInitial.toFixed(2));
        console.log('Montant TVQ:', tvq.toFixed(2));
        console.log('Montant TPS:', tps.toFixed(2));
        console.log('Total des taxes:', totalTaxes.toFixed(2));
        console.log('Montant total:', total.toFixed(2));
      } else {
        setErreur('Le montant doit être supérieur à 0');
        setMontantTotal(null);
      }
    } else {
      setErreur('Veuillez entrer un montant valide');
      setMontantTotal(null);
    }
  };

  return (
    <IonApp>
      {/* En-tête */}
      <IonHeader>
        <IonToolbar color="danger">
          <IonTitle>Calculateur de Taxes</IonTitle>
        </IonToolbar>
      </IonHeader>

      {/* Contenu */}
      <IonContent className="ion-padding">
        {/* Section pour les inputs des taxes */}
        <IonCard color="success">
          <IonCardContent>
            <IonInput
              type="number"
              placeholder="Entrez le montant"
              onIonChange={(e) => setMontant(parseFloat(e.detail.value!))}
            ></IonInput>
            <IonButton onClick={calculerTaxes} color="warning">Calculer</IonButton>
          </IonCardContent>
        </IonCard>

        {/* Section pour afficher les résultats */}
        {montantTotal !== null && montant !== null && (
          <IonCard color="tertiary">
            <IonCardContent>
              <p>Montant initial: {montant}$</p>
              <p>Montant TVQ: {(montantTotal - montant).toFixed(2)}$</p>
              <p>Montant TPS: {(montant !== null ? montant * 0.05 : 0).toFixed(2)}$</p>
              <p>Total des taxes: {(montantTotal - (montant !== null ? montant : 0)).toFixed(2)}$</p>
              <p>Montant total: {montantTotal.toFixed(2)}$</p>
            </IonCardContent>
          </IonCard>
        )}

        {/* Toast pour afficher les erreurs */}
        <IonToast
          isOpen={!!erreur}
          message={erreur}
          duration={3000}
          onDidDismiss={() => setErreur('')}
        />
      </IonContent>
    </IonApp>
  );
};

export default App;