<script lang='ts'>
    import Icon from '$lib/icons/+page.svelte';

    export let activityValue = '';
    export let activityIcon = '';
    export let percentageAchieved = 0;
    
    
    // 400px = 0%
    // 0px = 100%
    const strokeDashoffset = ((100 - percentageAchieved) / 100) * 400;
    const ringStrokeColor = '#0090E3';

</script>

<div class="circle circle-big">
    <svg height="150" width="150" style="--stroke-dashoffset: {strokeDashoffset}">
        <circle cx="80" cy="74" r="55" class="line-shadow" stroke="#000000" stroke-width="7" fill="none"></circle>
        <circle cx="80" cy="74" r="55" class="line line-1" stroke={ringStrokeColor} stroke-width="7" fill="none"></circle>
    </svg>
    
    <div class="info">
        <span class="info__top" style="color: white;">{activityValue}</span>
        <!-- <span class="info__bottom">{activityIcon}</span> -->
        <span class="info__icon">
            <Icon name={activityIcon} size='28' color='#A5A7A9' />
        </span>
    </div>
</div>

<style lang='scss'>
    // Original design
    // https://codepen.io/dianastanciu/pen/bGbwVNr

    svg {
        transform: rotate(-90deg);
    }
    
    .line {
        stroke-linecap: round;
        transform-style: linear;
    }
    
    $stroke-dasharray-1: 400;
    
    .line-1 {
        stroke-dasharray: $stroke-dasharray-1;
        animation: dash-1 1s linear forwards;
    }
    
    @keyframes dash-1 {
      from { stroke-dashoffset: $stroke-dasharray-1; }
        to { stroke-dashoffset: var(--stroke-dashoffset); }
    }
    
    .circle {
        position: relative;
        margin: 0 auto;
    }
    
    .circle-big {
        width: 150px;
        height: 150px;
        // margin-top: 15px;
    }
    
    .info {
        position: absolute;
        top: 50%;
        right: 50%;
        transform: translate(50%, -50%);
        text-align: center;
        
        &__top {
            color: #000;
            font-size: 1.1rem;
        }
        
        // &__bottom {
        //     color: #648192;
        //     font-size: 0.8em;
        //     display: block;
        // }

        &__icon {
            display: block;
            margin: 10px 0 0 0;
        }
    }
    
    .line-shadow {
        stroke: rgba(0,0,0,.3);
    }
</style>