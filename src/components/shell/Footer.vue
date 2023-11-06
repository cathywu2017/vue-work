<template>
  <footer>
    <div class="container">
      <div class="row align-items-center">
        <div class="col-md-8 copyright">
          <p class="m-md-0 text-center text-md-left">
            © 2019 Design by Han. 網站所有資料、圖片取自於網路，僅學習使用，無任何商業用途。
          </p>
        </div>
        <div class="col-md-4">
          <ul class="m-0 p-0 text-center text-md-right sns-icon">
            <li class="mx-2">
              <i class="fab fa-facebook-f"></i>
            </li>
            <li class="mx-2">
              <i class="fab fa-twitter"></i>
            </li>
            <li class="mx-2">
              <i class="fab fa-instagram"></i>
            </li>
            <li class="mx-2">
              <i class="fab fa-pinterest"></i>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "",
  data() {
    return {};
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
footer {
  .copyright {
    font-size: .8rem;
  }
  .sns-icon {
    font-size: 1.3rem;
    color: #000;
    li {
      display: inline-block;
      cursor: pointer;
    }
  }
}
</style>
