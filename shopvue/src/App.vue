<template>
  <div id="app">
    <AppHeader />
    <main class="container">
      <router-view />
    </main>
  </div>
</template>

<script>
import AppHeader from './components/AppHeader.vue'

export default {
  name: 'App',
  components: { AppHeader }
}
</script>

<style>
* { box-sizing: border-box; }
body { margin: 0; font-family: Arial, sans-serif; background: #f4f6f8; color: #222; }
a { color: #1a5fb4; text-decoration: none; }
.container { max-width: 1100px; margin: 0 auto; padding: 20px; }
.muted { color: #777; font-size: 14px; }
.price { font-weight: bold; font-size: 18px; }
.error { color: #b00020; }
.success { background: #e3f6e8; border: 1px solid #8fd19e; padding: 12px; border-radius: 6px; margin-bottom: 12px; }
.toast { background: #222; color: #fff; padding: 8px 12px; border-radius: 6px; display: inline-block; }
.btn { background: #1a5fb4; color: #fff; border: none; padding: 8px 14px; border-radius: 6px; cursor: pointer; font-size: 14px; }
.btn:disabled { background: #aaa; cursor: not-allowed; }
.btn.secondary { background: #e0e0e0; color: #222; }
.btn.danger { background: #c0392b; }
.btn.small { padding: 4px 10px; }
.toolbar { display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 16px; }
.search { display: flex; gap: 6px; }
.search input, .select, .form input { padding: 8px; border: 1px solid #ccc; border-radius: 6px; }
.grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 16px; }
.card { background: #fff; border-radius: 8px; padding: 12px; box-shadow: 0 1px 4px rgba(0,0,0,.1); }
.card img { width: 100%; height: 160px; object-fit: contain; }
.card h3 { font-size: 15px; margin: 8px 0 4px; color: #222; }
.pager { display: flex; gap: 12px; align-items: center; justify-content: center; margin-top: 20px; }
.detail { display: flex; gap: 24px; flex-wrap: wrap; margin-top: 16px; background: #fff; padding: 20px; border-radius: 8px; }
.detail-img { width: 320px; max-width: 100%; }
.cart-row { display: flex; align-items: center; gap: 14px; background: #fff; padding: 10px; border-radius: 8px; margin-bottom: 10px; }
.cart-row img { width: 70px; height: 70px; object-fit: contain; }
.grow { flex: 1; }
.qty { display: flex; align-items: center; gap: 8px; }
.summary { background: #fff; padding: 16px; border-radius: 8px; margin-top: 16px; }
.form { display: flex; flex-direction: column; gap: 12px; max-width: 340px; background: #fff; padding: 20px; border-radius: 8px; }
.form label { display: flex; flex-direction: column; gap: 4px; }
.header { background: #14213d; padding: 12px 24px; display: flex; justify-content: space-between; align-items: center; }
.header a { color: #fff; margin-left: 16px; }
.header .logo { font-size: 20px; font-weight: bold; margin-left: 0; }
.header a.router-link-exact-active { text-decoration: underline; }
.badge { background: #e63946; border-radius: 10px; padding: 1px 7px; font-size: 12px; }
.spinner-wrap { text-align: center; padding: 40px; }
.spinner { width: 40px; height: 40px; border: 4px solid #ddd; border-top-color: #1a5fb4; border-radius: 50%; margin: 0 auto 10px; animation: spin 1s linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }
.error-box { background: #fdecea; border: 1px solid #f5aca6; padding: 14px; border-radius: 6px; }
</style>