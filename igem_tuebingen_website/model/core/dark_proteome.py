import logging

console = logging.StreamHandler()
formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
console.setFormatter(formatter)
LOG = logging.getLogger("Dark Proteome")
LOG.addHandler(console)
LOG.setLevel(logging.INFO)


class DarkProteome:
    def __init__(self,
                 primary_accession=None,
                 uncertainty=None,
                 length=None,
                 disorder=None,
                 compositional_bias=None,
                 membrane=None):
        self._primary_accession = primary_accession
        self._uncertainty = uncertainty
        self._length = length
        self._disorder = disorder
        self._compositional_bias = compositional_bias
        self._membrane = membrane

    @property
    def primary_accession(self):
        return self._primary_accession

    @primary_accession.setter
    def primary_accession(self, value):
        self._primary_accession = value

    @property
    def uncertainty(self):
        return self._uncertainty

    @uncertainty.setter
    def uncertainty(self, value):
        self._uncertainty = value

    @property
    def length(self):
        return self._length

    @length.setter
    def length(self, value):
        self._length = value

    @property
    def disorder(self):
        return self._disorder

    @disorder.setter
    def disorder(self, value):
        self._disorder = value

    @property
    def compositional_bias(self):
        return self._compositional_bias

    @compositional_bias.setter
    def compositional_bias(self, value):
        self._compositional_bias = value

    @property
    def membrane(self):
        return self._membrane

    @membrane.setter
    def membrane(self, value):
        self._membrane = value

    def __eq__(self, other):
        if isinstance(other, self.__class__):
            return self.__dict__ == other.__dict__
        return NotImplemented

    def __ne__(self, other):
        comparison = self.__eq__(other)
        if comparison is not NotImplemented:
            return not comparison
        return NotImplemented

    def __str__(self):
        retr_str = ""

        retr_str += ("Primary accession: " + self.primary_accession + "\n")
        retr_str += ("Uncertainty: " + self.uncertainty + "\n")
        retr_str += ("Length: " + self.length + "\n")
        retr_str += ("Disorder: " + self.disorder + "\n")
        retr_str += ("Compositional bias: " + self.compositional_bias + "\n")
        retr_str += ("Membrane: " + self.membrane + "\n")

        return retr_str

    def __repr__(self):
        return str(self)

