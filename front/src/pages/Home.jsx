import React from "react";
import miel from "../assets/img/presentation-1.jpg";
import saveur from "../assets/img/saveur.jpg"
import bio from "../assets/img/bio.jpg"
import artisanal from "../assets/img/artisanal.png"

function Home() {
  return (
    <div className="Home-container">
      <h2>Bienvenue chez Miel d'Orient</h2>

      <div className="containers">
        <h3>Fabrication artisanale</h3>
        <img className="right" src={artisanal} alt="photo de miel" />
        <p>
          À Miel d'Orient, nous accordons une importance particulière à la
          fabrication artisanale de notre miel. Chaque pot de miel est le
          résultat d'un processus méticuleux, depuis la récolte des ruches
          jusqu'à la mise en pot finale. Nous sélectionnons avec soin les meilleures
          matières premières et veillons à ce que chaque étape soit réalisée dans
          le respect des traditions apicoles, garantissant ainsi la qualité et
          l'authenticité de notre produit.
        </p>
        <p>
          Nos apiculteurs, avec leur expertise et leur amour pour leur métier,
          veillent à ce que chaque étape du processus de fabrication soit
          réalisée avec le plus grand soin. Nous croyons fermement que cette
          approche artisanale donne à notre miel une qualité exceptionnelle et
          un goût unique. Chaque ruche est soigneusement entretenue et chaque
          récolte est traitée avec le respect qu'elle mérite, reflétant ainsi
          notre engagement envers la préservation de la nature et du savoir-faire
          traditionnel.
        </p>
      </div>

      <div className="containers">
        <h3>Nos engagements</h3>
        <img className="left" src={bio} alt="photo de miel" />
        <p>
          Miel d'Orient est une entreprise spécialisée dans la fabrication
          artisanale de miel provenant du Moyen-Orient. Nous sommes fiers de
          vous offrir des produits de la plus haute qualité, cultivés et
          récoltés avec soin dans les régions les plus pures du Moyen-Orient.
          Chaque pot de miel que vous achetez chez nous est une garantie de
          fraîcheur et de pureté, provenant directement de nos ruches aux
          saveurs uniques et authentiques.
        </p>
      </div>

      <div className="containers">
        <h3>La saveur unique de notre miel</h3>
        <img className="right" src={saveur} alt="photo de miel" />
        <p>
          Notre miel est réputé pour sa saveur délicate et ses bienfaits pour la
          santé. Nous sélectionnons avec attention les meilleures variétés de
          miel pour vous offrir une expérience gustative unique. Que vous
          préfériez un miel doux et crémeux ou un miel plus robuste avec des
          notes florales prononcées, notre sélection répondra à tous les goûts
          et toutes les préférences.
        </p>
      </div>

      <div className="containers">
        <h3>Découvrez notre sélection</h3>
        <img className="left" src={miel} alt="photo de miel" />
        <p>
          Parcourez notre sélection de miels exquis et découvrez les saveurs
          uniques de la nature du Moyen-Orient. Nous sommes convaincus que vous
          trouverez parmi nos produits celui qui éveillera vos papilles et
          enrichira votre quotidien. Chaque pot de miel est une invitation à
          voyager à travers les paysages et les traditions du Moyen-Orient,
          offrant une expérience sensorielle inoubliable à chaque dégustation.
        </p>
      </div>
    </div>
  );
}

export default Home;