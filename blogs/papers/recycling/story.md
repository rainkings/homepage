<div align="center">
<video controls autoplay preload="metadata" playsinline width="60%">
  <source src="./pebble-5au.mp4" type="video/mp4">
</video>
</div>

It has been a long-standing mystery where the water, key to life on Earth, came from. A variety of scenarios have been put forward, including the possibility that it was delivered to Earth by comets or asteroids, outgassed by volcanic activity, or produced by oxidizing reactions during the magma ocean stage. Yet, at a mass fraction of 0.1%, Earth remains overall a dry planet. On the other hand, the dominant type of exoplanets, super-Earths and sub-Neptunes, reveal a wide distribution of water inventories. Their water contents is likely determined during the planet formation process, when a protoplanet was accreting pebbles from the gaseous disk and formed its first atmosphere. But what regulates volatile delivery to protoplanets in this phase?

Pebbles containing water ice accreted by protoplanets are thought to be the main source of water. However, during accretion, the planetary atmosphere could become hot enough for the ice to sublimate and avoid direct accretion of water. The water ends up in the proto-atmosphere. But it may not remain there as (for low-mass planets) these atmosphere interact vigorously with the natal disk, a process known as recycling. The vapor may hence flow back to the disk (after freezing out as ice grains) limiting the water inventory of atmosphere and planet. However, the recycling hypothesis, has never been tested for high molecular weight vapors with hydrodynamical simulations.

To incorporate these features, we have designed a new phase change module on top of the recently-developed multi-dust fluid approach (Huang & Bai 2022) for the popular hydrodynamic code Athena++. In our new module, the movement of gas, pebbles, and vapor, are followed, while accounting for sublimation of ices in a self-consistent way. We find that the extent and the amount of vapor a planet is able to hold on to is determined by the relative size of the sublimation front and the atmosphere. When the sublimation front lies deep inside the atmosphere, vapor tends to be locked deep in the atmosphere and keeps accumulating through a positive feedback mechanism. This situation is illustrated in the video: the accumulation of vapor enlarges the atmosphere, rendering it impossible for the water vapor to escape. These planets become wet. On the other hand, when the sublimation front exceeds the (bound) atmosphere, the ice component of incoming pebbles can be fully recycled and the vapor content reaches a low, steady value. Low disk temperature, small planet mass and high volatile pebble fluxes render the planet atmosphere vapor-rich. The phase change module we have developed can also be employed to study the chemical composition of the gas in the vicinity of accreting planets and around disk snowlines.

-----
### Atmospheric Recyling of Volatiles by Pebble-Accreting Planets
Wang, Yu*; Ormel, Chris; Huang, Pinghui; Kuiper, Rolf <a style="display:inline;" href="https://ui.adsabs.harvard.edu/abs/2023MNRAS.523.6186W/abstract" class="web-link">[ADS]


