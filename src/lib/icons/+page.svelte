<script lang='ts'>

    import {
        mdiRun,
        mdiBike,
        mdiSwim,
        mdiTimerOutline,
        mdiSpeedometer,
        mdiGlassMugVariant,
        mdiFire,
        mdiElevationRise,
        mdiMoleculeCo2,
        mdiHeartPulse,
        mdiGlassWine,
        mdiGlassCocktail,
        mdiCakeLayered,
        mdiTaco,
        mdiPlus
    } from '@mdi/js';

    const ICONS = icons({
        mdiRun,
        mdiBike,
        mdiSwim,
        mdiTimerOutline,
        mdiSpeedometer,
        mdiGlassMugVariant,
        mdiFire,
        mdiElevationRise,
        mdiMoleculeCo2,
        mdiHeartPulse,
        mdiGlassWine,
        mdiGlassCocktail,
        mdiCakeLayered,
        mdiTaco,
        mdiPlus
    });


    export let name: string;
    export let size: string;
    export let color: string;

    let data = '';
        
    $: {
        const kind = name.replace(/-/g, '').toLowerCase();
        if (ICONS[kind]) {
            data = ICONS[kind];
        }
    }

    function icons(set: { [name: string]: string }) {
        const i: { [key: string]: string } = {};
        Object.keys(set).forEach(key => {
            i[key.slice(3).toLowerCase()] = set[key];
        });
        return i;
    }

</script>

<svg viewBox="0 0 24 24" width={size} height={size} color={color}>
    <path fill="currentColor" d="{data}"></path>
</svg>
  
<style lang='scss'></style>