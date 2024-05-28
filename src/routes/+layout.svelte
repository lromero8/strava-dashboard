<script lang='ts'>
    import { page } from '$app/stores';  

</script>

<div class="fifi-toolbar">
    <div class="fifi-toolbar-btns">
        <div class="fifi-logo">
            <span class="fifi-logo-name">FitFiesta</span>
            <span>🎉</span>
        </div>
        <div class="fifi-toolbar-item" class:fifi-item-selected={$page.url.pathname === '/'}><a href="/">Dashboard</a></div>
        <div class="fifi-toolbar-item" class:fifi-item-selected={$page.url.pathname === '/goals'}><a href="/goals">Goals</a></div>
        <div class="fifi-toolbar-item" class:fifi-item-selected={$page.url.pathname === '/calendar'}><a href="/calendar">Heat Calendar</a></div>
    </div>
</div>

<slot />



<style lang='scss'>
    $primary-color: #0090E3;

    .fifi-toolbar {
        position: fixed;
        right: 0;
        left: 0;
        top: 0;
        z-index: 100;

        padding: 10px 20px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

        background-color: #fff;
        color: #6c757d;
        font-size: 0.9em;
        font-weight: 600;
    }
    
    .fifi-toolbar-btns {
        display: flex;
        align-items: center;
        justify-content: start;

        .fifi-logo {
            margin-right: 40px;
            font-size: 1.2em;
        }

        .fifi-toolbar-item {
            margin: 0 10px;
            border-bottom: 0.2em solid #fff;

        }
        
        .fifi-toolbar-item.fifi-item-selected {
            border-bottom: 0.2em solid $primary-color;
        }

        .fifi-toolbar-item :hover {
            color: $primary-color;
        }

        .fifi-toolbar-item a {
            text-decoration: none;
            color: #6c757d;
        }
    }


    @media (max-width: 768px) {
        .fifi-logo-name {
            display: none;
        }
    }
</style>