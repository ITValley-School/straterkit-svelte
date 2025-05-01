<script>
  import SpkButton from "$lib/@spk/uielements/Button/SpkButton.svelte"; 
  import SpkBasicCard from "$lib/@spk/SpkBasicCard.svelte"; 
  import { Col, Row } from "@sveltestrap/sveltestrap";
  import SpkApexChart from "$lib/@spk/charts/SpkApexChart.svelte";
  import { TargetIncomplete,EarnedDropdown,ProfitsEarned,TotalData,RevenueAnalytics} from "$lib/data/dashboards/crmdashboard.js";
  import TopDeals from "$lib/view/dashboars/crm/TopDeals.svelte";
  import SpkDropdown from "$lib/@spk/uielements/Dropdown/SpkDropdown.svelte";
  import SpkCrmCard from "$lib/@spk/dashboards/SpkCrmCard.svelte"; 
  import DealsStatistics from "$lib/view/dashboars/crm/DealsStatistics.svelte";
  import LeadsBySource from "$lib/view/dashboars/crm/LeadsBySource.svelte"; 
  import RecentActivity from "$lib/view/dashboars/crm/RecentActivity.svelte"; 
  import DealsStatus from "$lib/view/dashboars/crm/DealsStatus.svelte"; 
</script>

<!-- Page Title -->
<svelte:head>
  <title>CRM | Ynex - Svelte Admin & Dashboard Template</title>
</svelte:head>
<!-- Page Title Close -->

<!-- Start::page-header -->
<div class="d-md-flex d-block align-items-center justify-content-between my-4 page-header-breadcrumb">
    <div>
        <p class="fw-semibold fs-18 mb-0">Welcome back, Json Taylor !</p>
        <span class="fs-semibold text-muted">Track your sales activity, leads and deals here.</span>
    </div>
    <div class="btn-list mt-md-0 mt-2">
        <SpkButton   buttontype="button" color="primary" customClass="btn-wave" text={`<i class="ri-filter-3-fill me-2 align-middle d-inline-block"></i>Filters`} />
        <SpkButton  outline={true} buttontype="button" color="secondary" customClass="btn-wave" text={` <i class="ri-upload-cloud-line me-2 align-middle d-inline-block"></i>Export`} />
    </div>
</div>
 <!-- End::page-header -->

<!-- Start::row-1 -->
<Row class="">
    <Col xxl={9} xl={12} class="">
        <Row class="">
            <Col xl={4} class="">
                <Row class="">
                    <Col xl={12} class="">
                        <SpkBasicCard cardProps="crm-highlight-card" headerTitle="" headerTitleProps="" cardBodyProps="" Headerprops="" >
                            <div slot="content">
                                    <div class="d-flex align-items-center justify-content-between">
                                        <div>
                                            <div class="fw-semibold fs-18 text-fixed-white mb-2">Your target is incomplete</div>
                                            <span class="d-block fs-12 text-fixed-white"><span class="op-7">You have completed</span> <span class="fw-semibold text-warning">48%</span> <span class="op-7">of the given target, you can also check your status</span>.</span>
                                            <span class="d-block fw-semibold mt-1"><a class="text-fixed-white" href="#!"><u>Click here</u></a></span>
                                        </div>
                                        <div><SpkApexChart id="crm-main" options={TargetIncomplete} customClass="" /></div>
                                    </div>
                            </div>
                          </SpkBasicCard>
                    </Col>
                </Row>
                <Col xl={12} class="">
                    <TopDeals/>
                </Col>
                <Col xxl={12} xl={12} lg={12} md={12} sm={12} class="col-12">
                    <SpkBasicCard cardProps="custom-card" headerTitle="Profit Earned" headerTitleProps="" cardBodyProps="py-0 ps-0" Headerprops="justify-content-between" >
                        <div slot="customheader">
                            <SpkDropdown  Color="" ToggleClass="p-0 fs-12 text-muted no-caret" Caret={false} parent={`View All<i class="ri-arrow-down-s-line align-middle ms-1 d-inline-block"></i>`} option={EarnedDropdown}/>
                        </div>
                        <div slot="content"><SpkApexChart id="crm-profits-earned" options={ProfitsEarned} customClass="" /> </div>
                    </SpkBasicCard>
                </Col>
            </Col>
            <Col xl={8} class="">
                <Row class="">
                    {#each TotalData  as stat}
                       <SpkCrmCard title={stat.title} value={stat.value} id={stat.id} chartOptions={stat.chartOptions} iconClass={stat.iconClass} iconBgClass={stat.iconBgClass} percentage={stat.percentage} linkText={stat.linkText} trendClass={stat.trendClass}/>
                    {/each}
                    <Col xl={12} class="">
                        <SpkBasicCard cardProps="custom-card" headerTitle="Revenue Analytics" headerTitleProps="" cardBodyProps="" Headerprops="justify-content-between" >
                            <div slot="customheader">
                                <SpkDropdown   Color="" ToggleClass="p-0 fs-12 text-muted no-caret" Caret={false} parent={`View All<i class="ri-arrow-down-s-line align-middle ms-1 d-inline-block"></i>`} option={EarnedDropdown}/>
                            </div>
                            <div slot="content"><div class="content-wrapper"><SpkApexChart id="crm-revenue-analytics" options={RevenueAnalytics} customClass="" /></div> </div>
                        </SpkBasicCard>
                    </Col>
                </Row>
            </Col>
            <Col xl={12} class="">
                <DealsStatistics/>
            </Col>
        </Row>
    </Col>
    <Col xxl={3} xl={12} class="">
        <Row class="">
            <Col xxl={12} xl={12} class="">
                <Row class="">
                    <Col xxl={12} xl={6} class="">
                        <LeadsBySource/>
                    </Col>
                    <Col xxl={12} xl={6} class="">
                        <DealsStatus/>
                    </Col>
                    <Col xxl={12} xl={12} class="">
                        <RecentActivity/>
                    </Col>
                </Row>
            </Col>
        </Row>
    </Col>
</Row>
<!-- End::row-1 -->
