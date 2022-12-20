import { ethers } from "hardhat"
import { expect, assert } from "chai"
import {SimpleStorage, SimpleStorage__factory} from "../typechain-types"

describe("SimpleStorage", function () {
    let simpleStorageFactory: SimpleStorage__factory, simpleStorage: SimpleStorage
    beforeEach(async function () {
        simpleStorageFactory = (await ethers.getContractFactory("SimpleStorage")) as SimpleStorage__factory 
        simpleStorage = await simpleStorageFactory.deploy()
    })

    it("Should start with a favorite number of 0", async function () {
        const currentValue = await simpleStorage.retrieve()

        const expectedValue = "0"

        assert.equal(currentValue.toString(), expectedValue)
    })

    it("Should updated when we call store", async function () {
        const expectedValue = "7"
        const transactionResponse = await simpleStorage.store(expectedValue)
        await transactionResponse.wait(1)

        const currentValue = await simpleStorage.retrieve()
        assert.equal(currentValue.toString(), expectedValue)
    })

    // Wrote a test for the addPerson() fn but not sure it's working at 100%

    it("Should have a name and favorite number", async function () {
        const expectedValueName = "John Doe"
        const expectedValueFavNumber = "2"

        const transactionResponse = await simpleStorage.addPerson(
            expectedValueName,
            expectedValueFavNumber
        )
        await transactionResponse.wait(1)

        for (let i = 0; i < simpleStorage.people.length; i++) {
            const person = simpleStorage.people[i]
            assert.equal(person.name.toString(), expectedValueName)
            assert.equal(
                person.favoriteNumber.toString(),
                expectedValueFavNumber
            )
        }
    })
})
