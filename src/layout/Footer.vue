<template>
  <footer>
    <div
      class="footer-info bg-primary d-flex flex-row flex-wrap justify-content-evenly text-white p-5"
    >
      <div class="my-3 p-2 d-flex flex-column align-items-center">
        <div class="bg-white rounded w-content p-3">
          <MapMarkerCircleIcon color="var(--bs-primary)" width="26px" />
        </div>
        <div class="text-center">
          <p class="fs-5 fw-600 py-3 m-0">ENDEREÇO</p>
          <p class="p-0 m-0">Av. Francisco Matarazzo, 1752 - Água Branca</p>
          <p class="p-0 m-0">Salas 2007 e 2008</p>
          <p class="p-0 m-0">São Paulo - SP - CEP 05001-200</p>
        </div>
      </div>
      <div class="my-3 p-2 d-flex flex-column align-items-center">
        <div class="bg-white rounded w-content p-3">
          <PhoneIcon color="var(--bs-primary)" width="26px" />
        </div>
        <div class="text-center">
          <p class="fs-5 fw-600 py-3 m-0">TELEFONE</p>
          <p class="p-0 m-0 fs-3 fw-600">(11) 3672-2866</p>
        </div>
      </div>
      <div class="my-3 p-2 d-flex flex-column align-items-center">
        <div class="bg-white rounded w-content p-3">
          <EmailOutlineIcon color="var(--bs-primary)" width="26px" />
        </div>
        <div class="text-center">
          <p class="fs-5 fw-600 py-3 m-0">E-MAIL</p>
          <p class="p-0 m-0 fs-6 fw-600">CONTATO@ABCCH.COM.BR</p>
        </div>
      </div>
      <div class="my-3 p-2 d-flex flex-column align-items-center">
        <div class="bg-white rounded w-content p-3">
          <ClockOutlineIcon color="var(--bs-primary)" width="26px" />
        </div>
        <div class="text-center">
          <p class="fs-5 fw-600 py-3 m-0">EXPEDIENTE</p>
          <p class="p-0 m-0 fw-600">
            Seg. a Sex. - das 09h00 às 12h30 e das 13h30 às 18h00
          </p>
          <p class="p-0 m-0 fw-600">(Exceto feriados)</p>
        </div>
      </div>
    </div>
    <Separator />
    <div class="bg-secondary d-flex flex-column align-items-center p-4">
      <Logo :width="100" />
      <span class="pt-4 fw-600 text-center">
        ABCCH - ASSOCIAÇÃO BRASILEIRA DE CRIADORES DO CAVALO DE HIPISMO - CNPJ:
        49.779.473/0001-28
      </span>
    </div>
  </footer>
</template>

<script>
import Separator from "@/components/Separator.vue";
import Logo from "@/components/Logo.vue";

import MapMarkerCircleIcon from "@/components/icons/MapMarkerCircle.vue";
import PhoneIcon from "@/components/icons/Phone.vue";
import EmailOutlineIcon from "@/components/icons/EmailOutline.vue";
import ClockOutlineIcon from "@/components/icons/ClockOutline.vue";

export default {
  components: {
    Separator,
    Logo,

    MapMarkerCircleIcon,
    PhoneIcon,
    EmailOutlineIcon,
    ClockOutlineIcon,
  },
};
</script>

<style lang="scss" scoped>
footer {
  .footer-info {
    > div {
      width: 25%;

      @media (max-width: 1000px) {
        width: 33%;
      }
      @media (max-width: 800px) {
        width: 50%;
      }
      @media (max-width: 600px) {
        width: 100%;
      }
    }
  }
}
</style>
