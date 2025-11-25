import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const images = [
    {
        title: "Orion Nebula",
        description: "A diffuse nebula situated in the Milky Way, south of Orion's Belt in the constellation of Orion. It is one of the brightest nebulae and is visible to the naked eye in the night sky.",
        imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAvxniJIVDAmO65dJ6tENYOtk6-wIgjTCOG4FpuPPGtEv3uWhuSkpvAaD72e9fXjcg2ZyTv9hE3yvkvM3E46plY_-_aAAxqKG3wkaLpA8aorEmDoIIMW6_pJ1nI662ZLNnAzDyWSDi2OtWa4fQgQpSBJLki4a5hs6Vx14Ib-KqQK8miQ4yHOM4JrmHkh72euCSOuWtiWGdXzDdeRaqYbaguoEXabuGAeGeZkV3PTqvPVsvSIZ4fhvOwnxtcqJo3ZqxUuKYiZbIbl-wI",
        camera: "ZWO ASI2600MC Pro",
        telescope: "Sky-Watcher Esprit 100ED",
        mount: "Sky-Watcher EQ6-R Pro",
        integration: "12 Hours"
    },
    {
        title: "Andromeda Galaxy",
        description: "The swirling arms of the Andromeda Galaxy",
        imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDzywz0pbwXcbCrC9g1JtZgyVTQdyO6AF-sVOYmEePr-7kgJVH1NUtTafjqHECVIvXGfNiTr56wHFCIIxvTKbpMbAbymnhsTTd2jPSpRJYNoHsNGpm-QkylFUFZThr1FUSHIaX04eg3IocVM3G9b-KLM7svAf6IUu8A0ffNAmLy_lkmsyuYtbBgOgzznhknLdShfE-qYLyYt9YYAqTsyfeSzF7DOO2AW7A5gsmO5IKsOg1tJzlcgidHf-lKOaMiUZ1I8R8s0-UaUGm0",
        camera: "Canon EOS 6D",
        telescope: "William Optics RedCat 51",
        mount: "Star Adventurer 2i",
        integration: "4 Hours"
    },
    {
        title: "Pleiades Star Cluster",
        description: "A cluster of bright blue stars known as the Pleiades",
        imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBw1dGo6HRWzwRitZzWnBfUBD9WMtgCdV4AIzLIfxvoE01cuD7TRZ-CIGbfxMWKB6OubUV4a-2u2Ly9TLMNLBgsKSTGRJqzv_Iay5wJlZzC-2gp_kmRG8EmmhZfbH95Esw3eDbBSCyVO1Mkz0nJsrg91mjAttrGBzRhAhAsmNih1CVla_cwsET94vmsor_6m2IN2rTEWB7GVOUowYDcRK5COwH69npuEHLTzmC5Fc8GI5SS6t6tqCJytp1WjCKkVqoFKCi1nL7HA4TZ",
        camera: "Nikon D850",
        telescope: "Takahashi FSQ-106",
        mount: "Paramount MyT",
        integration: "8 Hours"
    },
    {
        title: "Trifid Nebula",
        description: "The Trifid Nebula with its distinct red and blue regions",
        imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBCHPb8n24qYf0hhgqCUM6QE0sxysCwj0Gk_lF2NcvorxG7TlfIC6AglxfbrJXKSMscYP8gGDQzWJXVXt0yESE-wLMywumurrGlSei-qwRWkNkAqjCFhRsqWudlUVVMzWZqXkJPogCqja6QhSUgUUBBNx4M7mp9irmsIoY3OjqTN3FBE9PF1TyNQhrzDhadzuFBujK_azu4dxKc-NWGaFMHglLaeE7DeOecaABTbpqjmRa-qdzv5l949SOP_eeSTnROQE2hRx9T4Pym",
        camera: "ZWO ASI1600MM",
        telescope: "Celestron EdgeHD 8",
        mount: "CGX-L",
        integration: "15 Hours"
    },
    {
        title: "Carina Nebula",
        description: "The Carina Nebula showing pillars of cosmic dust and gas",
        imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuB3E9nQbYcmoOmjDcGBGiFtJpRkzi_Ah8gH_r69_Ap8OWhpZLzy7MPX4OTnUkLUQqg2Q52I7LajvIINPBnyO0rX1XIGyvMkgZp464FwiQyvFA5Swyel0G8WuieGABfbzng_7oKWj2YNv3QsIIk2NtJS31S32gCCOMaN3DIhtGb8C6KWe2hCKTHcEkc1D1y-zF44j7GqBOY0pxKdRQfwvLg8hmhmNYgNV8zS3riE-vVWhiH4r_r8WlUJQk6Ji7RQZf3yDVUeTZ9fj8GM",
        camera: "QHY600M",
        telescope: "Planewave CDK14",
        mount: "L-350",
        integration: "20 Hours"
    },
    {
        title: "Whirlpool Galaxy",
        description: "The Whirlpool Galaxy with its spiral structure",
        imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBYyjz3BJwkvpm7YKybYVyVn7EppzFq6vXmvT4QaA5c1hrDQiLc2mXZoaBzXVQD5EkOGyc9toIz-ARLdkvOhC2tErRMG6sbqHdqHqUS3xSxrsI8OOh7uYB5rt_KAhsw6ef8x-k1stkLXD6L_Ig6TEDsfW00dR74Kr2J8jTfMP7leRaxZRzUrpAXF_NSGDmp3vcklKfGzeyLTW8PXcTevB-KEtQczPOdqbeEZxLeLo1C7vpMyF1041ZBIjgyR5y3sZfZfocga8eaqiGX",
        camera: "ZWO ASI294MM",
        telescope: "Explore Scientific ED127",
        mount: "EQ6-R",
        integration: "10 Hours"
    },
    {
        title: "Horsehead Nebula",
        description: "The iconic Horsehead Nebula against a red glowing background",
        imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBlRXe0XenuMPk24f4wJ1W5Abyyq2i4GGzeK6Ls4uYqsVKhLGJDSsA6Bz0ZebEeeBevA6_GshHZEHQMMJ-09miDRQu8DZU6BO-hExBMRFj0zdNRZhAlkevl74TNUMnIQJW9Gh5vMDeQ1HIjhUPEBnuU0s4VCW-u8ZBqF3_CfTAUJvOkWWsQvJrxVeltv5cDwgNjchdX5eBOmdysH2yhFGpmxmHy1IZDfmsntIGJ6KcOS_ksSrLMSDSGj3Ts1J-s-OAzt8EyfPIbGSIh",
        camera: "ZWO ASI533MC",
        telescope: "RedCat 51",
        mount: "AM5",
        integration: "6 Hours"
    },
    {
        title: "Eagle Nebula",
        description: "Pillars of Creation within the Eagle Nebula",
        imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCIJCoovAfew_lT9H35drnU9Qhm3SMZacFAA2fGbZlP5XhKTqRM99SWeBumn_TCmIFbg4Tw8NoNRPruzsC4dVIL_zHmJH0Y2MnefEasQy1fX7niD4iPHzWC5Ij6pMm3RqSm1EfEiOHEW9-amA9ORB7Am7cVe5llUiZ8poRkPEEOq5aj-pD9zwJc-eVM3liUu6D_F4VXWIqcjJcGGxR0dvb-31dln2HO8kpNth5JY-DqY0-1nk1k1oWxMQoOSqxp9QKqP-E4Fmfw0s4T",
        camera: "ZWO ASI6200MM",
        telescope: "RASA 11",
        mount: "CGX",
        integration: "5 Hours"
    }
]

async function main() {
    console.log('Start seeding ...')
    for (const image of images) {
        const result = await prisma.image.create({
            data: image,
        })
        console.log(`Created image with id: ${result.id}`)
    }
    console.log('Seeding finished.')
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
