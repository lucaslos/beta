/* eslint react/prop-types: 0 */
import React from 'react';
import LangSwitcher from 'components/LangSwitcher';

import spaceScroll from 'utils/spaceScroll';


// TODO: add scroll icon
const Home = () => (
  <section id="home">
    <article>
      <h1 className="logotype" data-anim="1"><div className="mark" />LUCAS SANTOS</h1>
      <p data-anim="2">DESIGNER DE PRODUTOS DIGITAIS</p>

      <ul>
        <li><a className="button" href="#about-me" data-anim="3" onClick={() => spaceScroll.scrollToSection(1)}>SOBRE MIM</a></li>
        <li><a className="button" href="#works" data-anim="4" onClick={() => spaceScroll.scrollToSection(2)}>PROJETOS</a></li>
        <li><a className="button" href="#contact" data-anim="5" onClick={() => spaceScroll.scrollToSection(3)}>CONTATO</a></li>
      </ul>

    </article>
    <LangSwitcher />
  </section>
);

export default Home;
