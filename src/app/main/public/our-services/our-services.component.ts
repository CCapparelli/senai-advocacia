import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'our-services',
  imports: [CommonModule],
  templateUrl: './our-services.component.html',
  styleUrl: './our-services.component.css'
})
export class OurServicesComponent {
  faqs = [
    { question: 'O que é Advocacia Digital ?', answer: 'A advocacia digital parte do preceito da utilização de ferramentas digitais não só para o envio de arquivos de forma totalmente segura, como também de encontros com advogados e juízes através de videoconferências. Assim, o resultado acaba por vir mais rápido do que pelas vias tradicionais. Você economiza tempo, despesas com deslocamento e estacionamento, realizando a contratação conforme a sua disponibilidade, de onde estiver, em qualquer horário, para isso basta ter um celular ou um computador.' },
    { question: 'Que serviços o nosso escritório digital oferece ?', answer: 'Alguns dos serviços oferecidos pelo escritório: registro de marcas, consultivo/planejamento, contratos da elaboração a análise, Holding empresarial, cobranças e títulos de crédito, contratos da elaboração a análise, responsabilidade civil, usucapião – judicial e extrajudicial, cobranças e títulos de crédito, divórcio consensual, doação, Holding familiar, inventário e partilha, alvará judicial e testamento.' },
    { question: 'Por que é mais vantajoso contratar nossos serviços ?', answer: 'Você economiza tempo, despesas com deslocamento e estacionamento, realizando a contratação conforme a sua disponibilidade, de onde estiver, em qualquer horário, para isso basta ter um celular ou um computador, sendo que poderão enviar documentos pelo aplicativo WhatsApp em qualquer formato (jpeg, pdf, docx etc), podendo assinar eletronicamente procuração e contrato diretamente pela nossa plataforma.' },
    { question: 'Como iniciar um processo ?', answer: 'Agende ua contato com um de nossos advogados.' },
    { question: 'Qual é o valor dos nossos serviços ?', answer: 'Seguimos rigorosamente a tabela da Seccional da OAB, observando os valores mínimos alí estipulados. Assim, os honorários serão cobrados conforme o tempo dispensado, duração e complexidade de cada demanda. Após preenchimento do formulário de caso, passaremos valores, condições e formas de pagamentos.' },
  ];
  
  toggleResposta(index: number) {
    let item = document.getElementById(`answer${index}`);
    if (item) {
      let disp = item.style.display;
      item.style.display = (disp === 'block') ? 'none' : 'block';
    }
  }
}
