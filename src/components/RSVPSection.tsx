import { useState, useRef } from "react";
import { motion } from "motion/react";
import { Send, CheckCircle, XCircle } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { toast } from "sonner@2.0.3";
import { coupleInfo, weddingInfo } from "../config/constants";

export function RSVPSection() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    attending: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Refs para os campos do formulário
  const nameRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.phone || !formData.attending) {
      toast.error("Por favor, preencha todos os campos obrigatórios");

      // Focar no primeiro campo vazio
      if (!formData.name) {
        nameRef.current?.focus();
      } else if (!formData.phone) {
        phoneRef.current?.focus();
      }

      return;
    }

    setIsSubmitting(true);

    // TODO: submit the form and send the toast
    setTimeout(() => {
      toast.success("Confirmação enviada com sucesso! Obrigado!");
      setIsSubmitting(false);
      setFormData({
        name: "",
        phone: "",
        attending: "",
        message: "",
      });
    }, 2000);
  };

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, "");

    if (numbers.length <= 2) {
      return `(${numbers}`;
    } else if (numbers.length <= 7) {
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
    } else {
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`;
    }
  };

  const handleInputChange = (field: string, value: string) => {
    if (field === "phone") {
      const formattedPhone = formatPhone(value);
      setFormData((prev) => ({
        ...prev,
        [field]: formattedPhone,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }));
    }
  };

  return (
    <section id="confirmar-presenca" className="py-20 px-4 bg-neutral-dark/10">
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl text-accent-olive mb-4">
            Confirme sua Presença
          </h2>
          <motion.div
            className="w-24 h-1 bg-accent-olive mx-auto rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          />
          <motion.p
            className="text-muted-foreground mt-6 max-w-2xl mx-auto text-lg"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
          >
            Sua confirmação é muito importante para nós! Por favor, confirme sua
            presença até o dia{" "}
            <span className="text-accent-olive font-medium">
              {weddingInfo.confirmDate.toLocaleDateString("pt-BR", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>{" "}
            para que possamos organizar tudo com carinho.
          </motion.p>
        </motion.div>

        <motion.div
          className="bg-card border border-accent-olive/20 rounded-xl p-8 shadow-sm"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <Label htmlFor="name" className="text-accent-olive">
                Nome Completo *
              </Label>
              <Input
                ref={nameRef}
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="Digite seu nome completo"
                className="mt-2 border-accent-olive/30 focus:border-accent-olive"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <Label htmlFor="phone" className="text-accent-olive">
                Telefone *
              </Label>
              <Input
                ref={phoneRef}
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                placeholder="(11) 99999-9999"
                className="mt-2 border-accent-olive/30 focus:border-accent-olive"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              viewport={{ once: true }}
            >
              <Label className="text-accent-olive mb-4 block">
                Confirmação de Presença *
              </Label>
              <RadioGroup
                value={formData.attending}
                onValueChange={(value) => handleInputChange("attending", value)}
                className="space-y-3"
              >
                <label
                  className="flex items-center space-x-3 p-4 rounded-lg border border-accent-olive/20 hover:bg-accent-olive/5 transition-colors cursor-pointer"
                  htmlFor="yes"
                >
                  <RadioGroupItem
                    value="yes"
                    id="yes"
                    className="border-accent-olive text-accent-olive"
                  />
                  <span className="flex items-center gap-2 cursor-pointer flex-1 pointer-events-none">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    Sim, estarei presente! 🎉
                  </span>
                </label>

                <label
                  className="flex items-center space-x-3 p-4 rounded-lg border border-accent-olive/20 hover:bg-accent-olive/5 transition-colors cursor-pointer"
                  htmlFor="no"
                >
                  <RadioGroupItem
                    value="no"
                    id="no"
                    className="border-accent-olive text-accent-olive"
                  />
                  <span className="flex items-center gap-2 cursor-pointer flex-1 pointer-events-none">
                    <XCircle className="w-5 h-5 text-red-500" />
                    Infelizmente não poderei comparecer 😢
                  </span>
                </label>
              </RadioGroup>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
              viewport={{ once: true }}
            >
              <Label htmlFor="message" className="text-accent-olive">
                Mensagem para os Noivos (Opcional)
              </Label>
              <Textarea
                id="message"
                value={formData.message}
                onChange={(e) => handleInputChange("message", e.target.value)}
                placeholder={`Deixe uma mensagem especial para ${coupleInfo.bride} e ${coupleInfo.groom}...`}
                className="mt-2 border-accent-olive/30 focus:border-accent-olive min-h-[100px]"
                rows={4}
              />
            </motion.div>

            <motion.div
              className="text-center pt-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              viewport={{ once: true }}
            >
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-accent-olive hover:bg-accent-olive-dark text-white px-8 py-3 text-lg"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2 animate-spin" />
                    Enviando...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2" />
                    Confirmar Presença
                  </>
                )}
              </Button>
            </motion.div>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
