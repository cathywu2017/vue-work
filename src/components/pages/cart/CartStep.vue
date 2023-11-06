<template>
  <div>
    <ul class="mb-4 d-flex justify-content-center align-items-center cartSteps text-black-50 p-0">
      <li class="mx-5" :class="{'active' : $route.name == 'cart'}">
        <div class="text-center mb-2 py-1">step 1</div>
        <p>購物車清單</p>
      </li>
      <li class="mx-5" :class="{'active' : $route.name == 'cartOrder'}">
        <div class="text-center mb-2 py-1">step 2</div>
        <p>填寫收件資料</p>
      </li>
      <li class="mx-5" :class="{'active' : $route.name == 'cartCheck'}">
        <div class="text-center mb-2 py-1">step 3</div>
        <p>完成訂單！</p>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.cartSteps {
    li {
        position: relative;
        &:not(:last-child):before {
            content: '';
            display: block;
            width: 3.5rem;
            height: 1px;
            background: #ced4da;
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            right: -4.5rem;
            padding-left: .5rem;
        }
        &.active {
            color: #000;
            &:before {
                background: #000;
            }
        }
        div {
            border-top: 1px solid #ced4da;
            border-bottom: 1px solid #ced4da;
        }
    }
}
</style>