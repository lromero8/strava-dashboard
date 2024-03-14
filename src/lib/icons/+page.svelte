<script lang='ts'>

    import {
        mdiAccountCircle
    } from '@mdi/js';

    const ICONS = icons({
        mdiAccountCircle
    });


    export let name: string;

    const kind = name.replace(/-/g, '').toLowerCase();
    const data = ICONS[kind];

    function icons(set: { [name: string]: string }) {
        const i: { [key: string]: string } = {};
        Object.keys(set).forEach(key => {
            i[key.slice(3).toLowerCase()] = set[key];
        });
        return i;
    }

</script>

<svg class="mdi-icon" viewBox="0 0 24 24">
    <path fill="currentColor" d="{data}"></path>
</svg>
  
<style lang='scss'>
    .mdi-icon {
        width: 24px;
        height: 24px;
        fill: currentColor;
    }
</style>