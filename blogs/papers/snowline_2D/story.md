<div align="center">
<video controls autoplay preload="metadata" playsinline width="90%">
  <source src="./active.mp4" type="video/mp4">
</video>
</div>

In a protoplanetary disk--the birthplace of planets--the water snowline marks the location where temperatures become high enough for ice to sublimate, causing ice-rich pebbles to release their water to the gas phase. This seemingly trivial transition plays an important role in planet formation. Across the snowline, the disk’s composition changes dramatically, altering the materials available for building planets. By accumulation solids, the snowline can trigger formation of planetesimals via streaming instability. It may well be that the water snowline was the first location where this process took place at scale and that it was here where Jupiter had its genesis.

But how exactly does the snowline trap solids? Previous 1D models show that when icy pebbles drift inward and sublimate at the snowline, some of the resulting water vapor diffuses outward to recondenses just beyond the snowline. This “vapor retro-diffusion” process creates an ice pile-up, making the snowline a hotspot for solid concentration. However, these studies neglect the disk's vertical structure.

To address this, we have used the Athena++ code with a state-of-the-art phase change module (Wang et al. 2023) to simulate the snowline in a more realistic 2D R-Z (radial-vertical) disk. Our results reveal a vigorous water cycling in the vertical dimension (as shown in the movie): ice-rich pebbles (blue) drift inward and sublimate (pink vapor), which diffuses in all directions. Once vapor diffuses to the cooler upper layers, it recondenses back onto pebbles, which growth cause them to settle to the disk midplane (blue streamlines). Though water tries to leave the snowline via diffusion, recondesation and settling effectively trap much of it at the midplane. This water cycle, together with hydrodynamic flow at the snowline, boosts the solid-to-gas ratio by another factor of 3 compared to 1D results, further supporting the snowline as the site to form the first generation of planetesimals.

In addition, since our simulation self-consistently computes the disk temperature. We find that ice sublimation cools the disk midplane through latent heat absorption, shifting the snowline inwards. This latent heat cooling creates a distinct temperature plateau--a new observational channel for locating snowlines in disks.

-----

### Solving for the 2D water snowline with hydrodynamic simulations: Emergence of the gas outflow, water cycle, and temperature plateau.
Wang, Yu*; Ormel, Chris; Mori, Shoji; Bai, Xuening <a style="display:inline;" href="https://ui.adsabs.harvard.edu/abs/2025A%26A...696A..38W/abstract" class="web-link">[ADS]