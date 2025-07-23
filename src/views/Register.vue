<template>
  <Page title="Como Registrar" subtitle="Seu Potro/Potra">
    <div class="px-5 text-center">
      <p class="fs-16px">
        Este guia explica, passo a passo, como lançar as informações necessárias
        para registrar genealogicamente seu potro ou potra na ABCCCH (Associação
        Brasileira de Criadores do Cavalo de Hipismo).
      </p>

      <p class="fw-bold fs-4 m-0">BASE LEGAL</p>
      <p>
        Todos os registros seguem o regulamento técnico aprovado pelo MAPA
        (Ministério da Agricultura e Pecuária), vigente desde 13/04/2023.
      </p>
    </div>

    <div class="bg-primary text-center text-white fs-4 fw-500 my-5 px-5">
      PASSO A PASSO DO REGISTRO
    </div>

    <div class="px-5 text-center">
      <p class="fw-bold fs-5 m-3">1️⃣ COMUNICAÇÃO DE COBRIÇÃO</p>
      <p>
        <b>Tipos de cobrição:</b>
        <br />
        Monto natural; <br />
        Inseminação artificial (IA); <br />
        Transferência de embrião (TE); <br />
        ICSI (injeção intrócitoplasmática de espermatozoides).
      </p>
      <p>
        <b>⚠️ IMPORTANTE (ICSI):</b>
        A data da “cobrição” é o momento da fecundação in vitro, mesmo que o
        embrião seja colocado depois (6–10 dias).
      </p>
      <p>
        <b>Quem faz:</b>
        Proprietário do garanhão/sêmen ou o médico veterinário responsável pela
        técnica, devidamente cadastrado na ABCCCH.
      </p>
      <p>
        <b>Prazos:</b>
        <br />
        Cobrições de 01/03 a 31/08 ➝ comunicar até 31/12 do mesmo ano. <br />
        Cobrições de 01/09 a 28/02 ➝ comunicar até 30/06 do ano seguinte.
      </p>
      <p>Multa por atraso: R$ 1,00 por dia, cobrada do proprietário da égua.</p>
      <p>
        <b>Outras exigências:</b>
        <br />
        Informar se houve TE. <br />
        Anexar nota fiscal (de sêmen se adquirido de terceiros). <br />
        A égua doadora deve ter coleta de cria registrada na ABCCCH.
      </p>

      <p class="fw-bold fs-5 m-3 mt-5 pt-3">
        2️⃣ COMUNICAÇÃO DE TRANSFERÊNCIA DE EMBRIÃO (TE)
      </p>
      <p>
        <b>Quem faz:</b> Médico veterinário cadastrado, com autorização do
        proprietário da égua doadora.
      </p>

      <p>
        <b>
          <span class="text-danger fs-18px pt-1">!</span>
          Antes de comunicar o nascimento, é obrigatório informar:
        </b>
        Transferência temporária ou arrendamento da doadora.
      </p>

      <p class="fw-bold fs-5 m-3 mt-5 pt-3">3️⃣ COMUNICAÇÃO DE NASCIMENTO</p>
      <p>
        <b>Quem faz:</b>
        <br />
        Proprietário do potro (normalmente o dono da égua ou do embrião).
      </p>

      <p>
        <b>Como fazer:</b>
        <br />
        Via sistema na área restrita ou preenchendo e enviando o formulário
        físico (aba Stud Book ➝ Formulários).
      </p>

      <p>
        <b>Prazos:</b>
        <br />
        Até 90 dias após o nascimento.<br />
        <b>Multa por atraso:</b> R$ 1,00 por dia.
      </p>

      <p>
        <b>Inclui:</b>
        <br />
        Nome do potro + afixo do criador;<br />
        data de nascimento;
        <br />filiação (pai/mãe).
      </p>

      <p class="fw-bold fs-5 m-3 mt-5 pt-3">4️⃣ PRÉ-REGISTRO E INSPEÇÃO</p>
      <p>
        <b>Disponível:</b>
        <br />
        Após a comunicação de nascimento, na área restrita do criador ou
        inspetor.
      </p>

      <p>
        <b>Prazo para inspeção:</b>
        <br />
        Até 1 ano após o nascimento<br />
        <b>Multa por atraso:</b> R$ 1,00 por dia
      </p>

      <p>
        <b>Quem realiza:</b>
        <br />
        Inspetor credenciado da ABCCCH.<br />
        Lista de inspetores:
        <BButton
          pill
          variant="primary"
          size="sm"
          class="text-uppercase fw-600 px-3 py-0"
          :to="{ name: 'inspectors' }"
        >
          Clique Aqui
        </BButton>
      </p>

      <p>
        <b>Na inspeção, serão realizados:</b>
        <br />
        Resenha do animal;<br />
        Confirmação do nome, data e sexo;<br />
        Coleta de crina para DNA;<br />
        Implantação de microchip.
      </p>

      <p>
        <b>Após inspeção:</b>
        <br />
        O inspetor envia os documentos à ABCCCH em até 30 dias.<br />
        Transferência de propriedade do embrião inválido.
      </p>

      <p class="fw-bold fs-5 m-3 mt-5 pt-3">FINALIZAÇÃO DO PROCESSO</p>
      <p>
        A ABCCCH verifica a documentação, realiza a cobrança e, após aprovação
        do DNA, libera o registro.
      </p>
      <p>
        O documento é enviado via Correios e também fica disponível no site na
        "Consulta de Animal".
      </p>
      <p>
        Todo o processo pode ser feito pelo site na área restrita do criador ou
        veterinário.
      </p>
      <p>
        Em alternativa, os formulários físicos podem ser enviados assinados à
        ABCCH.
      </p>

      <BButton
        pill
        variant="primary"
        class="text-uppercase fw-600 px-4"
        :to="{ name: 'docs', params: { type: 'regulamento' } }"
      >
        ACESSO O REGULAMENTO COMPLETO DO SRG
      </BButton>
    </div>
  </Page>
</template>

<script>
import Page from "@/components/Page.vue";

export default {
  components: {
    Page,
  },
};
</script>
