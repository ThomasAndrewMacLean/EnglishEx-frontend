<template>
    <section>
        <h1 class="title">Developers Page</h1>
        <ul>
            <li>
                <a href="https://sentry.io/tmac/englishex-frontend/" target="_blank">frontend sentry</a>
            </li>
            <li>
                <a href="https://sentry.io/tmac/englishex-api/" target="_blank">backend sentry</a>
            </li>
            <li>
                <a href="https://app.dashbird.io/lambdas/eu-west-1/englishex---api/tabs/overview" target="_blank">dashbird
                    backend monitoring</a>
            </li>
            <li>
                <a href="https://analytics.google.com/analytics/web/#/report-home/a110018468w184610848p181927921"
                    target="_blank">google analytics</a>
            </li>
        </ul>

    </section>
</template>

<script>
export default {};
</script>

<style scoped>
section {
    height: 80vh;
    width: 100vw;
    background: url('https://sentry-brand.storage.googleapis.com/sentry-pattern.png');
}

ul {
    list-style: inside;
    background: white;
    width: 200px;
    margin: 2rem;
    border-radius: 4px;
    border: 2px solid lightgrey;
}

li {
    margin: 1rem;
}
</style>
