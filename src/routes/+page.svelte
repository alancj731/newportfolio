<script lang="ts">
</script>

<p class="skill web absolute text-[54px] font-[800] text-white">Web Dev</p>
<p class="skill ds absolute text-[54px] font-[800] text-white">Data Science</p>
<p class="skill cloud absolute text-[54px] font-[800] text-white">Cloud</p>
<p class="skill py absolute text-[40px] font-[800] text-white">Python</p>
<p class="skill sql absolute text-[40px] font-[800] text-white">SQL</p>
<p class="skill tp absolute text-[40px] font-[800] text-white">TypeScript</p>
<p class="skill llm absolute text-[38px] font-[800] text-white">LLM</p>
<p class="skill next absolute text-[40px] font-[800] text-white">Next.js</p>
<p class="skill sve absolute text-[40px] font-[800] text-white">SvelteKit</p>
<p class="skill azure absolute text-[40px] font-[800] text-white">Azure</p>
<p class="skill gcp absolute text-[38px] font-[800] text-white">GCP</p>

<style>
	@keyframes fade-out {
		0% {
			opacity: 1;
			filter: blur(0px);
		}
		100% {
			opacity: 0.4;
			filter: blur(2px);
		}
	}
	.skill {
		font-family: 'Poppins', sans-serif;
		animation: fade-out 6s forwards;
	}
	.skill:hover {
		animation: none;
		scale: 1.1;
		opacity: 1;
        color: yellow;
		transition: all 0.5s linear;
	}
	.web {
		top: 2%;
		left: 10%;
		@media (min-width: 768px) {
			top: 5%;
			left: 20%;
		}
        @media (min-width: 1280px) {
			top: 5%;
			left: 40%;
		}
	}
	.ds {
		top: 36%;
		left: 6%;

		@media (min-width: 768px) {
			top: 38%;
			left: 30%;
		}
        @media (min-width: 1280px) {
			top: 46%;
			left: 65%;
        }
	}
	.cloud {
		top: 69%;
		left: 36%;
		@media (min-width: 768px) {
			top: 70%;
			left: 45%;
		}
        @media (min-width: 1280px) {
			top: 72%;
			left: 45%;
        }
	}
	.py {
		top: 48%;
		left: 6%;
		@media (min-width: 768px) {
			top: 48%;
			left: 15%;
		}
        @media (min-width: 1280px) {
			top: 48%;
			left: 20%;
        }
	}
	.sql {
		top: 55%;
		left: 65%;
		@media (min-width: 768px) {
			top: 55%;
			left: 70%;
		}
        @media (min-width: 1280px) {
			top: 38%;
			left: 55%;
        }
	}
	.tp {
		top: 12%;
		left: 38%;
		@media (min-width: 768px) {
			top: 15%;
			left: 44%;
		}
        @media (min-width: 1280px) {
			top: 15%;
			left: 75%;
        }
	}
	.llm {
		top: 60%;
		left: 28%;
		@media (min-width: 768px) {
			top: 60%;
			left: 40%;
		}
        @media (min-width: 1280px) {
			top: 62%;
			left: 35%;
        }
	}
	.next {
		top: 28%;
		left: 61%;
		@media (min-width: 768px) {
			top: 28%;
			left: 68%;
		}
        @media (min-width: 1280px) {
			top: 30%;
			left: 35%;
        }
	}
	.sve {
		top: 22%;
		left: 6%;
		@media (min-width: 768px) {
			top: 25%;
			left: 10%;
		}
        @media (min-width: 1280px) {
			top: 20%;
			left: 10%;
        }
	}
	.azure {
		top: 81%;
		left: 8%;
		@media (min-width: 768px) {
			top: 82%;
			left: 18%;
		}
        @media (min-width: 1280px) {
			top: 85%;
			left: 25%;
        }
	}
	.gcp {
		top: 86%;
		left: 65%;
		@media (min-width: 768px) {
			top: 88%;
			left: 71%;
		}
        @media (min-width: 1280px) {
			top: 89%;
			left: 60%;
        }
	}
</style>
